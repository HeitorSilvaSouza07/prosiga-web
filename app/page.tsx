export default function Home(){
  return(
    <div className="bg-red-500 rounded-2xl m-4 h-12  ">
      <header className="flex flex row justify-between itens-center">
        <h1 className="text-white">ProSiga</h1>
        <ul className="flex flex-row gap-2 mr-5">
          <li className="hover:scale-101 text-white">Home</li>
          <li className="hover:scale-101 text-white">Sobre</li>
          <li className="hover:scale-101 text-white">login</li>
        </ul>
      </header>
      
    </div>
  )
}