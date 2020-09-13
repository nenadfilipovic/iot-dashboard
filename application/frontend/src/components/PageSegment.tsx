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
    cardActions: {
      padding: '16px',
      justifyContent: 'flex-end',
    },
  }),
);

const PageSegment = ({
  title,
  subheader,
  icon: Icon,
  content,
  actions,
}: PageSegmentAttributes) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={<Typography variant="subtitle1">{title}</Typography>}
        subheader={subheader}
        avatar={
          <Avatar className={classes.avatar}>
            <Icon />
          </Avatar>
        }
      />
      {content && <Divider />}
      <CardContent>{content}</CardContent>
      {actions && (
        <React.Fragment>
          <Divider />
          <CardActions className={classes.cardActions}>{actions}</CardActions>
        </React.Fragment>
      )}
    </Card>
  );
};

export { PageSegment };
