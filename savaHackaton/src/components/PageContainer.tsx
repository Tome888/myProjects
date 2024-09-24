interface ChildProps{
    children: any
}

export function PageContainer({children}:ChildProps){
    return(
        <div className="wrapperPages">
            {children}
        </div>
    )
}