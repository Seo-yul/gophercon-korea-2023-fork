import Layout from "@/components/layout";
import About from "@/container/about";
import Location from "@/container/location";
import Session from "@/container/session";
import Sponsors from "@/container/sponsors";
import { getI18nProps } from "@/i18n/utils/getI18nProps";

export const getStaticProps = getI18nProps;

export default function Home() {
  return (
    <Layout main>
      <Location />
      <About />
      <Session />
      <Sponsors />
    </Layout>
  );
}
