/*
Converts seconds to human readable date and time
Example :  
    INPUT: 1671501636
    RETURNS: "Tue Dec 20 2022 07:30:36 GMT+0530 (India Standard Time)"
*/
export default function epochToTimestampString(seconds: number): string {
  return (new Date(seconds * 1000)).toLocaleString();
}
