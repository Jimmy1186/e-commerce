
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";


function Payment() {
    const payMutation = trpc.useMutation(["example.hello"]);
  const router = useRouter();
  const myEl = useRef(null);

  const onPay = useCallback(() => {
    payMutation.mutate({
      text: "sda",
    })
  }, []);

  useEffect(() => {
  
    if(payMutation.data?.htm){
(myEl.current as unknown as HTMLElement).getElementsByTagName("form")[0]?.submit();
    }
  
  }, [payMutation.isSuccess]);


if(payMutation.data){
  return <div ref={myEl} dangerouslySetInnerHTML={{ __html: payMutation.data.htm}} />
}
  return (
    <button onClick={() =>onPay()}>pay here</button>
  )
}

export default Payment