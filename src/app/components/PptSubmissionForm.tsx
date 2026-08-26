import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase, SUPABASE_BUCKET } from '../../utils/supabaseClient';
import styles from './PptSubmissionForm.module.css';

interface SubmissionFormProps {
  onSuccess?: () => void;
}

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MiB

export default function PptSubmissionForm({ onSuccess }: SubmissionFormProps) {
  const [teamName, setTeamName] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > MAX_FILE_SIZE) {
      setError('फ़ाइल का आकार 15 MiB से अधिक है। कृपया छोटा PPT अपलोड करें।');
      setPptFile(null);
    } else {
      setError('');
      setPptFile(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!teamName || !teamNumber || !leaderName || !pptFile) {
      setError('सभी फ़ील्ड भरें और PPT फ़ाइल चुनें।');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // 1️⃣ Upload PPT to Supabase Storage
      const fileExt = pptFile.name.split('.').pop();
      const filePath = `${teamName.replace(/\s+/g, '_')}_${teamNumber}_${leaderName.replace(/\s+/g, '_')}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(filePath, pptFile, {
          upsert: false,
          cacheControl: '3600',
          contentType: pptFile.type,
        });

      if (uploadError) throw uploadError;
      const publicUrl = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(filePath).publicURL;

      // 2️⃣ Insert row in `team` table
      const { error: dbError } = await supabase.from('team').insert({
        team_name: teamName,
        team_number: parseInt(teamNumber, 10),
        leader_name: leaderName,
        ppt_file: publicUrl,
      });
      if (dbError) throw dbError;

      setSuccessMsg('PPT सफलतापूर्वक अपलोड हो गया!');
      if (onSuccess) onSuccess();
      // Reset form
      setTeamName('');
      setTeamNumber('');
      setLeaderName('');
      setPptFile(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Navkriti '26 PPT Submission</h2>
      {error && <p className={styles.error}>{error}</p>}
      {successMsg && <p className={styles.success}>{successMsg}</p>}
      <label className={styles.label}>
        टीम नाम
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        टीम नंबर
        <input
          type="number"
          value={teamNumber}
          onChange={(e) => setTeamNumber(e.target.value)}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        लीडर का नाम
        <input
          type="text"
          value={leaderName}
          onChange={(e) => setLeaderName(e.target.value)}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        PPT फ़ाइल (अधिकतम 15 MiB)
        <input type="file" accept=".ppt,.pptx" onChange={handleFileChange} required className={styles.inputFile} />
      </label>
      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? 'अपलोड हो रहा है...' : 'PPT अपलोड करें'}
      </button>
    </form>
  );
}
