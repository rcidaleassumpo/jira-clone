export default function Nav(props: any) {
  return (
    <div className="h-12 shadow-md flex justify-between p-2 mb-5">
      {props.children}
    </div>
  );
}
