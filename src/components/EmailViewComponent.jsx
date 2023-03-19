import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function EmailViewComponent({ emails }) {
  console.log("emails", emails);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {emails &&
        emails.map((emailObj) => (
          <Accordion
            key={emailObj.id}
            expanded={expanded === emailObj.id}
            onChange={handleChange(emailObj.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${emailObj.id}-content`}
              id={`${emailObj.id}-header`}
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {emailObj.subject}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {emailObj.from}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div dangerouslySetInnerHTML={{ __html: emailObj.body }}></div>
              </Typography>
            </AccordionDetails>
            
          </Accordion>
        ))}
    </div>
  );
}

export default EmailViewComponent;
