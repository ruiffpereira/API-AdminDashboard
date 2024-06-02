import { Fragment } from "react";
function Settings() {
  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              
              <span className="absolute right-0 bottom-0 text-sm">
                editphotp
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div>Rui Pereira</div>
              <div>Portugal</div>
            </div>
          </div>
          
        </div>
        <div className="flex flex-col gap-2">
          <div className="">Nome</div>
          <input></input>
        </div>
        <div className="flex flex-col gap-2">
          <div className="">Email</div>
          <input></input>
        </div>
        <div className="flex flex-col gap-2">
          <div className="">Numero</div>
          <input></input>
        </div>
        <div className="flex flex-col gap-2">
          <div className="">Morada completa</div>
          <input></input>
        </div>
      </div>
    </Fragment>
  );
}

export default Settings;
