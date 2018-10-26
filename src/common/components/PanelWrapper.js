// @flow
import React from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const styles = (theme: Object) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
  },
  summary: {
    backgroundColor: "#004080",
    marginTop: "0px",
  },
  icon: {
    color: "#fff",
  },
  details: {
    padding: 0,
  },
  link: {
    color: "#e1f5fe",
    marginLeft: 40,
    textDecoration: "none",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** The title to display for the panel */
  title: string,
  /** Children passed to component */
  children: any,
  /** The path that View All links to */
  route: string,
}

/**
 * This is a basic panel wrapper that uses Material-UI for the design.
 * It is used for every panel on the gene summary page.
 */

const PanelWrapper = ({ classes, title, route, children }: Props) => (
  <div className={classes.root}>
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary
        className={classes.summary}
        expandIcon={<ExpandMoreIcon className={classes.icon} />}>
        <Typography className={classes.heading}>
          {title}
          {route && (
            <Link className={classes.link} to={route}>
              View All
            </Link>
          )}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default withStyles(styles)(PanelWrapper)
