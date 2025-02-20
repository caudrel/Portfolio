export function getConstraints(data: any) {
    return Array.isArray(data)
        ? data.map((item: any) => {
              const constraintsKey = Object.values(item.constraints)[0]
              const propertyName = item.property
              return {
                  [propertyName]: constraintsKey,
              }
          })
        : null
}
