import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export const ErrorAlert = ({ message }: { message: string }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);