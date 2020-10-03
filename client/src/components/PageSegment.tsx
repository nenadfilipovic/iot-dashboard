import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from '@material-ui/core';

import { ReactSVGComponent } from '../types';

export interface PageSegmentAttributes {
  headerTitle: string;
  headerSubtitle: string;
  headerIcon: ReactSVGComponent;
  headerActions?: JSX.Element;
  bodyContent?: JSX.Element;
  bodyActions?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerActions: {
      margin: 0,
      alignSelf: 'center',
    },
    bodyActions: {
      padding: '16px',
      justifyContent: 'flex-end',
    },
  }),
);

const PageSegment = ({
  headerTitle,
  headerSubtitle,
  headerIcon: Icon,
  headerActions,
  bodyContent,
  bodyActions,
}: PageSegmentAttributes) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        classes={{ action: classes.headerActions }}
        title={<Typography children={headerTitle} variant="body1" />}
        subheader={
          <Typography
            color="textSecondary"
            children={headerSubtitle}
            variant="body2"
          />
        }
        avatar={<Icon />}
        action={<React.Fragment>{headerActions}</React.Fragment>}
      />
      {bodyContent && (
        <React.Fragment>
          <Divider />
          <CardContent>{bodyContent}</CardContent>
        </React.Fragment>
      )}
      {bodyActions && (
        <React.Fragment>
          <Divider />
          <CardActions className={classes.bodyActions}>
            {bodyActions}
          </CardActions>
        </React.Fragment>
      )}
    </Card>
  );
};

export { PageSegment };
