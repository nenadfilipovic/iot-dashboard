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
  Avatar,
} from '@material-ui/core';

import { ReactSVGComponent } from '../types';

export interface PageSegmentAttributes {
  title: string;
  subtitle: string | Date;
  icon: ReactSVGComponent;
  headerMenu?: JSX.Element;
  content?: JSX.Element;
  actions?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightMedium,
    },
    avatar: {
      color: theme.palette.getContrastText(theme.palette.secondary.main),
      backgroundColor: theme.palette.secondary.main,
    },
    headerMenu: {
      margin: 0,
      alignSelf: 'center',
    },
    actions: {
      padding: '16px',
      justifyContent: 'flex-end',
    },
  }),
);

const PageSegment = ({
  title,
  subtitle,
  icon: Icon,
  headerMenu,
  content,
  actions,
}: PageSegmentAttributes) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        classes={{ action: classes.headerMenu }}
        title={<Typography className={classes.title} children={title} />}
        subheader={<Typography variant="body2" children={subtitle} />}
        avatar={
          <Avatar className={classes.avatar} variant="rounded">
            <Icon />
          </Avatar>
        }
        action={<React.Fragment>{headerMenu}</React.Fragment>}
      />
      {content && (
        <React.Fragment>
          <Divider />
          <CardContent>{content}</CardContent>
        </React.Fragment>
      )}
      {actions && (
        <React.Fragment>
          <Divider />
          <CardActions className={classes.actions}>{actions}</CardActions>
        </React.Fragment>
      )}
    </Card>
  );
};

export { PageSegment };
