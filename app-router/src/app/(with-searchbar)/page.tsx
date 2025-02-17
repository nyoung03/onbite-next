import ClientComponent from "../../components/client-component";
import styles from "./page.module.css";
import ServerComponent from "../../components/server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      index page
      {/* children으로 컴포넌트를 넘기면 서버컴포넌트를 전환하지 않음 */}
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
