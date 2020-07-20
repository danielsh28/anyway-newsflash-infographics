import React, { FC } from 'react';
import WidgetsTemplate from '../components/organisms/WidgetsTemplate';
import { Box } from '@material-ui/core';
import SideBar from '../components/organisms/SideBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { RouteComponentProps, Redirect } from 'react-router';
import { borderColor } from '../style';
import FilterBar from '../components/organisms/FilterBar';
import OverlayLoader from '../components/molecules/OverlayLoader';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';

interface IProps {}

interface IRouteProps {
  id?: string;
}

const useStyles = makeStyles({
  mainBox: {
    height: 'inherit',
  },

  widgetBox: {
    height: 'inherit',
    overflow: 'auto',
  },
});

const HomePage: FC<IProps & RouteComponentProps<IRouteProps>> = ({ match }) => {
  const classes = useStyles();
  const store: RootStore = useStore();
  const initialId = store?.newsFlashCollection[0]?.id;
  const id = match.params.id ? parseInt(match.params.id) : initialId;
  const loading = store.widgetBoxLoading;
  return (
    <Box display="flex" flexGrow={1} className={classes.mainBox}>
      <Box flexGrow={1} maxWidth={319} display="flex" borderLeft={1} borderColor={borderColor}>
        <SideBar />
      </Box>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <OverlayLoader show={loading} />
        <FilterBar />
        {id ? <WidgetsTemplate id={id} /> : <Redirect to={`/newsflash/${initialId}`} />}
      </Box>
    </Box>
  );
};

export default observer(HomePage);
