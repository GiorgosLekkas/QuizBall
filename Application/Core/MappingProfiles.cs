using Application.Core.Questions;
using AutoMapper;
using Domain;

namespace Application.Core {
    public class MappingProfiles : Profile {
        public MappingProfiles(){

            //CreateMap<Question_Field, Question_Field>();

            CreateMap<Question_Field, Question_FieldDto>()
                .ForMember(d => d.Question, o => o.MapFrom(s => s.Question))
                .ForMember(d => d.Photo, o => o.MapFrom(s => s.Photo))
                .ForMember(d => d.Answer1, o => o.MapFrom(s => s.Answer1))
                .ForMember(d => d.Answer2, o => o.MapFrom(s => s.Answer2))
                .ForMember(d => d.CorrectAnswer1, o => o.MapFrom(s => s.CorrectAnswer1))
                .ForMember(d => d.CorrectAnswer2, o => o.MapFrom(s => s.CorrectAnswer2))
                .ForMember(d => d.CorrectAnswer3, o => o.MapFrom(s => s.CorrectAnswer3))
                .ForMember(d => d.CorrectAnswer4, o => o.MapFrom(s => s.CorrectAnswer4))
                .ForMember(d => d.CorrectAnswer5, o => o.MapFrom(s => s.CorrectAnswer5))
                .ForMember(d => d.Level, o => o.MapFrom(s => s.Level))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category))
                .ForMember(d => d.Confirmed, o => o.MapFrom(s => s.Confirmed))
                .ForMember(d => d.AuthorName, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.AuthorId, o => o.MapFrom(s => s.Author.Id))
                .ReverseMap();

           CreateMap<QuestionAuthor, QuestionAuthorDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Account.UserName))
                .ForMember(d => d.FirstName, o => o.MapFrom(s => s.Account.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(s => s.Account.LastName))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.Account.Email))
                .ForMember(d => d.Role, o => o.MapFrom(s => s.Account.Role))
                .ForMember(d => d.Gender, o => o.MapFrom(s => s.Account.Gender))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Account.Photo.Url));

            CreateMap<Account, Profiles.Profile>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.UserName))
                .ForMember(d => d.FirstName, o => o.MapFrom(s => s.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(s => s.LastName))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.Email))
                .ForMember(d => d.Role, o => o.MapFrom(s => s.Role))
                .ForMember(d => d.Gender, o => o.MapFrom(s => s.Gender))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photo.Url))
                .ForMember(d => d.Questions, o => o.MapFrom(s => s.Questions));

            /*CreateMap<QuestionAuthor, Profiles.Profile>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Account.UserName))
                .ForMember(d => d.FirstName, o => o.MapFrom(s => s.Account.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(s => s.Account.LastName))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.Account.Email))
                .ForMember(d => d.Role, o => o.MapFrom(s => s.Account.Role))
                .ForMember(d => d.Gender, o => o.MapFrom(s => s.Account.Gender))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Account.Photo.Url));*/
        }
    }
}