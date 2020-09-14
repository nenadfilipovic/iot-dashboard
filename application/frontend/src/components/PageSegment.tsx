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

interface PageSegmentAttributes {
  headerTitle: string;
  headerSubtitle: string;
  headerIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  bodyContent?: JSX.Element;
  bodyActions?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.primary.main,
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
  bodyContent,
  bodyActions,
}: PageSegmentAttributes) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={<Typography variant="subtitle1">{headerTitle}</Typography>}
        subheader={headerSubtitle}
        avatar={
          <Avatar className={classes.avatar}>
            <Icon />
          </Avatar>
        }
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
