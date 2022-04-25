type ConditionalWrapperType = {
    wrapper: (e:(JSX.Element)) => JSX.Element,
    children: JSX.Element,
    condition: boolean,
}

function ConditionalWrapper({wrapper, children, condition}:ConditionalWrapperType) {
    return condition ? wrapper(children) : children
}

export default ConditionalWrapper