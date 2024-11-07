import { Card, Grid } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";

const Authentication = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-7 h-screen overflow-hidden">
            {/* <img
            className="h-full w-full"
            src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png "
            alt=""
          /> */}

            <div className="Body-Contents">
              <div className="Container">
                <div className="card">
                  <img className="background" src="https://media.istockphoto.com/id/1413735503/photo/social-media-social-media-marketing-thailand-social-media-engagement-post-structure.webp?b=1&s=170667a&w=0&k=20&c=uWxtb9sVwaXcmDLAGFhldXKufDYmnSufh6RScO3KBUU=" alt="" />

                  <div className="card-content">
                    <div className="profile-image"></div>

                    {/* <h3 className="title">GTA 6</h3> */}
                  </div>
                  <div className="backdrop"></div>
                </div>

                <div className="card">
                  <img
                    className="background"
                    src="https://media.istockphoto.com/id/1205703732/photo/social-media-concept.webp?b=1&s=170667a&w=0&k=20&c=UaPPjD16dRftgz-rl03K8qx566Y3wmCUtbS7XlaXpAA="
                    alt=""
                  />

                  <div className="card-content">
                    <div className="profile-image"></div>

                    {/* <h3 className="title">Spider-Man PS5</h3> */}
                  </div>
                  {/* <div className="backdrop"></div> */}
                </div>

                <div className="card">
                  <img
                    className="background"
                    src="https://media.istockphoto.com/id/1296421211/photo/business-network-concept-group-of-businessperson-teamwork-human-resources.jpg?s=612x612&w=0&k=20&c=hwA-z9QQdkzjreQSa1c6OyZb2eBZfuXrfxU_OWq97i8="
                    alt=""
                  />

                  <div className="card-content">
                    <div className="profile-image"></div>

                    {/* <h3 className="title">God Of War</h3> */}
                  </div>
                  <div className="backdrop"></div>
                </div>

                <div className="card">
                  <img
                    className="background"
                    src="https://media.istockphoto.com/id/1652215712/photo/woman-showing-mobile-phone-to-camera-close-up-online-messaging-digital-overlay.jpg?s=612x612&w=0&k=20&c=FX1hRzgDlJuvAN47ihxeBEyFzEBnth7CoXkXIhZAGu4="
                    alt=""
                  />

                  <div className="card-content">
                    <div className="profile-image"></div>

                    {/* <h3 className="title">The Last of Us</h3> */}
                  </div>
                  <div className="backdrop"></div>
                </div>

                <div className="card">
                  <img
                    className="background"
                    src=" https://media.istockphoto.com/id/1268329856/photo/hand-with-a-mobile-phone-shows-a-cloud-of-data.jpg?s=612x612&w=0&k=20&c=w6lkLnKlanhoIRq9vHVwlHdfcUNr_GM4hwj4Yn3YOKk="
                    alt=""
                  />

                  <div className="card-content">
                    <div className="profile-image"></div>

                    {/* <h3 className="title">Elden Ring</h3> */}
                  </div>
                  <div className="backdrop"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-5 d-flex justify-content-center align-items-center ">
            <div className="Card-Style d-flex flex-col justify-center">
              <Card className="card p-4 card-style">
                <div className="flex flex-col items-center mb-3 space-y-1">
                  <h1 className="logo text-center">Social App</h1>
                  <p className="text-center text-sm w-[70%]">
                    Connecting Lives,Sharing Stories:Your Social World,Your Way
                  </p>
                </div>

                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
