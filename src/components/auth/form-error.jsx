import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
function FormError({ message }) {
  if (!message) return null;
  return (
    <div className="bg-destructive/10 p-2 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-5 w-5" /> {message}
    </div>
  );
}

export default FormError;
