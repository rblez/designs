import { Footer } from "@rblez-ui/react";
import { columns, legal } from "../footerData";

export default function FooterDemo() {
  return <Footer columns={columns} legal={legal} logo={<img src="/ui/isotipo.svg" alt="" className="demo-logo" />} />;
}
