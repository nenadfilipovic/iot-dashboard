import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from '@material-ui/core';

import { PageSegmentAttributes } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
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
        title={<Typography variant="subtitle1">{headerTitle}</Typography>}
        subheader={headerSubtitle}
        avatar={
          <Avatar className={classes.avatar}>
            <Icon />
          </Avatar>
        }
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
