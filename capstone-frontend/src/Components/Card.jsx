import * as React from "react";
import { Card as BaseCard, StyledBody } from "baseui/card";
import Block from "baseui/block";

const Card = ({ homeTeam, awayTeam, odds, data, homeLogo, awayLogo }) => {
  

  const primaryColors = ["#C8102E", "#007A33", "#000000", "#1D1160", "#CE1141", "#860038", "#00538C", "#0E2240", "#C8102E", "#1D428A", "#CE1141", "#002D62", "#C8102E", "#552583", "#5D76A9", "#98002E", "#00471B", "#0C2340", "#0C2340", "#006BB6", "#007AC1", "#0077C0", "#006BB6", "#1D1160", "#E03A3E", "#5A2D81", "#C4CED4", "#CE1141", "#002B5C", "#002B5C"];
  const teams = ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'];


  const findBackgroundColor = (team1, team2) => {
    const index1 = teams.indexOf(team1);
    const index2 = teams.indexOf(team2);
    const color1 = index1 !== -1 ? primaryColors[index1] : "black";
    const color2 = index2 !== -1 ? primaryColors[index2] : "black";
    return `linear-gradient(to right, ${color1}, ${color2})`;
  };

  const formatDate = (dateString) => {
    const utcDate = new Date(dateString);
    const estDate = new Date(utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000));
  
    // Determine if the date is in DST
    const isDst = (date) => {
      const marSecondSunday = new Date(date.getFullYear(), 2, 14 - (new Date(date.getFullYear(), 2, 1).getDay()));
      const novFirstSunday = new Date(date.getFullYear(), 10, 7 - (new Date(date.getFullYear(), 10, 1).getDay()));
      return date >= marSecondSunday && date < novFirstSunday;
    };
  
    // Adjust for Eastern Time Zone (5 hours behind UTC; 4 hours during DST)
    estDate.setHours(estDate.getHours() - (isDst(estDate) ? 4 : 5));
  
    const formatter = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + minutes + ' ' + ampm;
    };
  
    return `${formatter(estDate)} EST`;
  };

  const textStyle = {
    fontSize: "16px",
    fontWeight: "700",
    color: "white",
    margin: "5px 0", // Example margin
    textAlign: "center",
    textShadow: "0 0 18px Black"
    
  };

  const imageStyle = {
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    boxShadow: '0px 0px 2px 2px orange' // Adding a soft white glow
  };



  const gameDateTime = data ? formatDate(data) : 'Time Not Available';
  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: "10px", border: 'solid orange 3px', textAlign: 'center' }}>
      <BaseCard
        overrides={{
          Root: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              width: "398px",
              height: "200px",
              borderRadius: "0px",
              justifyContent: 'center',
              alignItems: 'center',
              background: findBackgroundColor(homeTeam, awayTeam),
              backgroundImage: `url('image-url'), ${findBackgroundColor(homeTeam, awayTeam)}`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'overlay'
            }
          }
        }}
      >
        <StyledBody style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <img src={homeLogo} alt={homeTeam} style={imageStyle} />
          <div style={{ flex: '1' }}>
            <div style={{ ...textStyle, fontSize: "18px" }}>{"@" + homeTeam}</div>
            <div style={textStyle}>{"Game Time: " + gameDateTime}</div>
            {odds.map((outcome, index) => (
              <div key={index} style={textStyle}>
                {outcome.team}: {outcome.price}
              </div>
            ))}
          </div>
          <img src={awayLogo} alt={awayTeam} style={imageStyle} />
        </StyledBody>
      </BaseCard>
    </div>
  );
};

export default Card;