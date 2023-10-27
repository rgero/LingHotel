/* eslint-disable react/prop-types */
const SuggestedUsers = ({users}) => {
  const maxUsers = 3;
  let returnedUsers = users.slice(0, maxUsers);
  return (
    <div>
      {returnedUsers.map(user => <div key={user.id}>{user.fullName}</div>)}
    </div>
  )
}

export default SuggestedUsers
