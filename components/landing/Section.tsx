
export const Section = ({children,className,id}:any) => {
  return (
        <section id={id} className={`relative px-[0.5rem] py-[2rem] lg:px-[3.5rem] lg:py-[3rem] xl:px-[5rem] ` + className}>
            {children}
        </section>
  )
}
