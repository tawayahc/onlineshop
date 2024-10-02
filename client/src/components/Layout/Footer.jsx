import React from "react";
import { LogoSVG } from "../../assets/images"
export default function Footer() {
  return (
    <div>
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <aside>
          <img src={LogoSVG} alt="" className="w-48"/>
          <p>
            GHouse Industries Ltd.
            <br />
            Providing reliable tech since 2077
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Member</h6>
          <div className="grid grid-cols-2 grid-flow-row  gap-4">
            <p>กิตติ์พิพัฒน์ สุขสวย 1004</p>
            <p>ชยาวัฒน์ อะนาโรจน์ 1012</p>
            <p>ธีรวุฒิ พลอยจินดามณี 1031</p>
            <p>ศรัณย์ คำไทย 1051</p>
            <p>ศุภกร ตั้งปฐมปราโมทย์ 1053</p>
            <p>ภูวเดช อินทอง 1085</p>
          </div>
        </nav>
      </footer>
    </div>
  );
}
