import { Toast } from "@radix-ui/react-toast";
import type { ToastProps } from "@radix-ui/react-toast";

function ToastComponent(props: ToastProps) {
  return <Toast {...props} />;
}

export default ToastComponent;
