import { useDispatch } from 'react-redux';
import FormCreateThread from '../components/form-create-thread';
import { asyncAddThread } from '../states/threads/action';
import BackButton from '../components/back-button';

export default function CreatePage() {
  const dispath = useDispatch();
  const onAddthread = ({ title, category, body }) => {
    dispath(asyncAddThread({ title, category, body }));
  };

  return (
    <section>
      <BackButton />
      <h2 className="my-4 text-2xl font-semibold text-center">
        Create New <span className="text-rose-500">Thread</span>
      </h2>
      <FormCreateThread addThread={onAddthread} />
    </section>
  );
}
