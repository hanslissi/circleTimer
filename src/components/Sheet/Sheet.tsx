import styles from "./Sheet.module.css";

type Props = Readonly<{
  title: string;
  show: boolean;
  children?: React.ReactNode;
}>;

const Sheet = ({ title, show, children }: Props) => {
  return show ? (
    <div className={styles.sheetContainer}>
      <div className={styles.backdrop} />
      <div className={styles.sheet}>
        <h2 className='shinyTextLight'>{title}</h2>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Sheet;
