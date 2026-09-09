using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WTFTN.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLocationCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Locations",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Locations");
        }
    }
}
