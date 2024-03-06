import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="border border-dashed rounded-md shadow border-slate-500" onClick={() => navigate(-1)}>
      <div className="flex flex-row items-center gap-2 px-1.5 py-1 ">
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Back</span>
      </div>
    </button>
  );
}
