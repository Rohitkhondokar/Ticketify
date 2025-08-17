import { CheckCircledIcon } from "@radix-ui/react-icons";
function FormSuccess({ message }) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/10 rounded-md p-2 flex items-center gap-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-5 w-5" /> {message}
    </div>
  );
}

export default FormSuccess;
