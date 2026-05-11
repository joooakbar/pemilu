export const scrollToSection = (
  selector: string
) => {

  const element =
    document.querySelector(selector)

  if (!element) return

  element.scrollIntoView({
    behavior: 'smooth',
  })
}