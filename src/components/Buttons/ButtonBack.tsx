import { useNavigate } from 'react-router-dom';
import Button from './Button';
export default function ButtonBack() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} style='back'>
      Back
    </Button>
  );
}
