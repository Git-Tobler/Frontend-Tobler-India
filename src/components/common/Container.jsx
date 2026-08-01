function Container({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={`container-content ${className}`}>{children}</Tag>
}

export default Container
