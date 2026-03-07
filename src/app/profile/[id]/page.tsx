export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>User Profile</h1>
      <hr />
      <article>
        <p>{params.id}</p>
      </article>
    </div>
  );
}
