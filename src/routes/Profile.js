function Profile({user}) {
  console.log(user.photoURL)

  const editProfile = (e) => {
    const { files } = e.currentTarget;
    const reader = new FileReader();
    reader.onload = async (e) => {
      // e.target.result
      user.updateProfile({
        displayName: '이주영',
        photoURL: e.target.result
      })
    }

    reader.readAsText(files[0]);
  }
  return (
    <>
    <div>{user.displayName}</div>
    <img src={user.photoURL} alt="이미지" />
    <form>
      <input type="file" onChange={editProfile} />
    </form>
    </>

  )
}
export default Profile;