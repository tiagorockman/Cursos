namespace MFC.Domain.ContractContext.Enums
{
    public enum ETypePerson
    {
        Fisica = 1,
        Juridica = 2,
    }

    public static class EtypersonGetValue
    {
        public static ETypePerson Get(string value)
        {
            return value.Contains("F") ? ETypePerson.Fisica : ETypePerson.Juridica;
        }
    }
}
