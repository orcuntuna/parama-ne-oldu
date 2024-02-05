import Image from 'next/image'

const Header = () => {
  return (
    <>
      <a className="absolute top-5 right-5" href="https://github.com/orcuntuna/parama-ne-oldu" target="_blank">
        <Image src={require('@/assets/img/github.svg')} width={28} height={28} alt="Source Code on GitHub" />
      </a>

      <div>
        <h1 className="text-3xl font-semibold mb-0.5">Parama ne oldu?</h1>
        <h2 className="text-xl text-gray-600">Paranızın döviz/altın/asgari ücret karşısında ne kadar eridiğini kolayca görün.</h2>
      </div>
    </>
  )
}

export default Header
