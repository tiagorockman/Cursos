using System.ComponentModel;

namespace MFC.Domain.ContractContext.Enums
{
    public enum EMovementType
    {
        [Description("Inclusão")]
        Inclusion = 1,
        [Description("Exclusão")]
        Exclusion = 2,
    }

    public static class EMovementTypeGetValue
    {
        public static EMovementType Get(string value)
        {
            return value.Contains("I") ? EMovementType.Inclusion : EMovementType.Exclusion;
        }

        public static string GetDescription(this EMovementType val)
        {
            DescriptionAttribute[] attributes = (DescriptionAttribute[])val
                .GetType()
                .GetField(val.ToString())
                .GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attributes.Length > 0 ? attributes[0].Description : "Não Definido";
        }
    }
}