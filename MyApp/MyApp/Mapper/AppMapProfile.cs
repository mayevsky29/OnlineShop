using AutoMapper;
using MyApp.Data.Entities.Identity;
using MyApp.Models;

namespace MyApp.Mapper
{
    public class AppMapProfile : Profile
    {
        public AppMapProfile()
        {
            CreateMap<RegisterViewModel, AppUser>()
                .ForMember(x => x.Photo, opt => opt.Ignore())
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));

            CreateMap<AppUser, UserItemViewModel>()
            .ForMember(x => x.Photo, opt => opt.MapFrom(x => $"/images/{x.Photo}"));
        }
    }
}
