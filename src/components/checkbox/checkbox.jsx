import { checkIcon } from '../../assets/svgs';
import "./checkbox.css"

export default function CheckBox({label, isCheked, disabled, onChange}) {
  return (
    <>
      <div className={!disabled ? "cb-main" : "cb-main-disabled"} onClick={!disabled ? onChange : undefined}>
        <div className="cb-check">{isCheked && checkIcon}</div>
        <p>{label ? label : "Checkbox"}</p>
      </div>
    </>
  );
}