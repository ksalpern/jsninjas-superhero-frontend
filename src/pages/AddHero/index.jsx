import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";
import styles from "./AddHero.module.scss";

export const AddHero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [nickName, setNickName] = useState("");
  const [realName, setRealName] = useState("");
  const [description, setDescription] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("failed to upload image!");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = useCallback((value) => {
    setDescription(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        nickName,
        realName,
        catchPhrase,
        description,
        imageUrl,
        tags,
      };

      const { data } = isEditing
        ? await axios.patch(`/heros/${id}`, fields)
        : await axios.post("/heros", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/heros/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("failed to create a hero!");
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/heros/${id}`)
        .then(({ data }) => {
          setNickName(data.nickName);
          setRealName(data.realName);
          setCatchPhrase(data.catchPhrase);
          setDescription(data.description);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(","));
        })
        .catch((err) => {
          console.warn(err);
          alert("failed to get a hero!");
        });
    }
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "300px",
      autofocus: true,
      placeholder: "Enter description...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Upload preview
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="nickName..."
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="realName..."
        value={realName}
        onChange={(e) => setRealName(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.catchPhrase }}
        variant="standard"
        placeholder="catchPhrase.."
        value={catchPhrase}
        onChange={(e) => setCatchPhrase(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Superpower 1, Superpower 2, Superpower3"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={description}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Save" : "Create"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
