import { useStoreActions } from "app/state/store/hooks";
import { Link, useHistory } from "react-router-dom";

interface Props {
  path: string;
  value: string;
  title: string;
  description: string;
  date: string;
  iconLinks?: {
    link: string;
    icon: React.ReactElement;
  }[];
}
export function GridItem(props: Props) {
  const history = useHistory();
  const changeDatasource = useStoreActions(
    (store) => store.DataSourceState.setValue
  );
  const setShowDatasourceSnackbar = useStoreActions(
    (store) => store.DataSourceSnackbarVisibility.setValue
  );

  const onClickHandler = () => {
    changeDatasource(props.value);
    setShowDatasourceSnackbar(true);
    setTimeout(() => {
      history.push(props.path);
    }, 500);
  };

  return (
    <div
      onClick={onClickHandler}
      css={`
        padding: 16px;
        height: 125px;
        cursor: pointer;
        background: #fff;
        position: relative;
        @media (max-width: 767px) {
          height: 125px;
        }

        > div {
          font-weight: bold;
          line-height: 18px;
          margin-bottom: 4px;
          font-family: "Inter", "Helvetica Neue", sans-serif;

          &:nth-of-type(2) {
            font-size: 10px;
            line-height: 12px;
            color: #495057;
            font-weight: normal;
            font-family: "Inter", "Helvetica Neue", sans-serif;
          }
        }

        &:hover {
          border-color: #13183f;
        }
      `}
    >
      <div>{props.title} </div>
      <div>{props.description} </div>
      {props.iconLinks && (
        <div
          css={`
            gap: 20px;
            bottom: 33px;
            display: flex;
            position: absolute;
            flex-direction: row;
            pointer-events: none;

            > a {
              padding-right: 10px;
              display: inline-flex;
              transform: scale(1.2);

              &:not(:last-child) {
                border-right: 1px solid #868a9d;
              }

              > svg {
                > path {
                  fill: #868a9d;
                }
              }
            }
          `}
        >
          {props.iconLinks.map((iconLink) => (
            <Link to={iconLink.link} key={iconLink.link}>
              {iconLink.icon}
            </Link>
          ))}
        </div>
      )}
      <div
        css={`
          display: flex;
          justify-content: space-between;
          margin-top: 2.5rem;
          font-size: 12px;
          color: #262c34;
          font-weight: 500;
          font-family: "Inter";
        `}
      >
        <p>Creation date</p>
        <p>{props.date}</p>
      </div>
    </div>
  );
}
