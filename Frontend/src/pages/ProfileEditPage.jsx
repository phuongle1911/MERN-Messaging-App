import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import "../styles/ProfileEditPage.css"

export default function ProfileEditPage() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    image: "",
    description: ""
  });
  const [error, setError] = useState("");


  const patchData = async (data) => {
    await api.patch("/profiles/edit", {
      image: data?.image || "",
      description: data?.description || ""
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      if (!response?.data?.error) {
        alert("Profile saved!")
        navigate("/profiles")
      }
    });
  };



  const onChangeInput = (e) => {
    const fieldName = e?.target?.name;
    let fieldValue = e?.target?.value;

    if (fieldName === "image") {    
      fieldValue = e.target.files[0];
      if (fieldValue) {
        const allowTypes = ["image/jpeg", "image/png"];

        if (!allowTypes.includes(fieldValue.type)) {
          setError("File type is not valid! Only accept .jpeg or .png file!");
          fieldValue = "";
          return;
        }
      }
    }
    setProfile((currentValue) => ({ ...currentValue, [fieldName]: fieldValue }));
  };

  const onSave = (e) => {
    e.preventDefault();
    patchData({
      image: profile?.image,
      description: profile?.description
    }
    );
  };


// Check if profile already available
  useEffect(() => {
    api.get("/profiles").then((response) => {

      setProfile({
          username: response?.data?.username || "",
          description: response?.data?.description || "",
          image: response?.data?.image || "",
          email: response?.data?.email || "",
      });
  })
  }, []);


  return (
    <main>
      <div className="edit-profile" >
        <h2>Create/ Edit Profile</h2>
      <form>
        <div className="user-field">
          <p>Username: {profile.username}</p>
        </div>
        <div className="user-field">
          <p>Email: {profile.email}</p>
        </div>
        <div>
          {error && <p>{error}</p>}
          <label htmlFor="avatar">Profile image:</label>
          <input type="file" id="avatar" name="image" accept="image/jpeg, image/png" onChange={onChangeInput}/>
        </div>
        <div>
          <label htmlFor="description">Bio description:</label>
          <input type="text" id="description" name="description" value={profile?.description} onChange={onChangeInput} />
        </div>
        <button type="submit" onClick={onSave}>Save</button>
      </form>
      </div>
    </main>
    )
  }