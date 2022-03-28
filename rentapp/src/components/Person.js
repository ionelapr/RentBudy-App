import React from 'react'

export default function Person() {
    return (
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>RoleID</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, i) =>
                        <tr key={i}>
                            <td>{user.Name} {user.Surname}</td>
                            <td>{user.Username}</td>
                            <td>{user.Password}</td>
                            <td>{user.Role_ID}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
