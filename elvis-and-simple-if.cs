private IValues UpdateValue(IValues packages)
{
    IValues wrappedPackages = packages;

    if (wrappedPackages != null
        && wrappedPackages.packages != null
        && wrappedPackages.packages.Any()
        && wrappedPackages.packages[0].InnerValue != null
        && !wrappedPackages.packages[0].InnerValue.StartsWith("T"))
    {
        wrappedPackages.packages[0].InnerValue = unwrap(wrappedPackages.packages[0].InnerValue);
    }

    return wrappedPackages;
}


//Refactored
private IValues UpdateValue(IPackets packages)
{
    var innerValue = packages?.packages?.FirstOrDefault()?.InnerValue;

    if (innerValue == null || innerValue.StartsWith("T"))
        return packages;

    var wrappedPackages = packages.Clone();
    wrappedPackages.packages[0].InnerValue = unwrap(innerValue);
    return wrappedPackages;
}
