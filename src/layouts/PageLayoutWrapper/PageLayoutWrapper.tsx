import styles from "./PageLayoutWrapper.module.css";

type Props = {
  children: React.ReactNode;
};

export const PageLayoutWrapper = ({ children }: Props) => {
  return <main className={styles.pageLayout}>{children}</main>;
};
