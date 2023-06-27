export default function LoadingIcon() {
  return (
    <div className="inline-flex">
      <svg
        fill="none"
        className="h-8 w-8 animate-spin text-indigo-100"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}
