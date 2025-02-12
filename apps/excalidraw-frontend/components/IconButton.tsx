import { ReactNode } from "react";

export function IconButton({ icon, onClick, activated }: {
  icon: ReactNode,
  onClick: () => void,
  activated: boolean
}) {
  return <div className={` m-2 pointer rounded-full border p-2 ${activated ? "text-red-400" : "text-white"} hover:bg-gray`} onClick={onClick}>
    {icon}
  </div>
}