import image from '../../assets/wallpaper.jpg'

export default function Dashboard({ name, user_id }) {
  let welcomeMessage = 
    (!name ? 
      <div>Welcome come to <b>CodecupHSGS</b>! Please <a href="#">login</a> to start competing</div>
      : <div>Welcome back, {name}!</div>
    ); 
  welcomeMessage = <div className="font-bold text-3xl">{welcomeMessage}</div>
  return (
    <div className="m-3 p-3 border-2 border-black">
      {welcomeMessage}
      <img src={image} alt="bocchi" className="my-2"></img>
    </div>
  )
}